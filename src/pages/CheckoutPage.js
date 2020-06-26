import React, { useState, useEffect } from 'react';

// UI
import { Section, Form, Input, Select, CheckBox, Tabs } from '../components/UI';
import { AUTH_USER, REQUEST_CODE } from '../graphql/mutations'
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setToken, decodeToken, getToken, deleteToken } from '../services/token';
import { useBranches } from '../hooks';

const CheckoutPage = (props) => {
    const [authUser] = useMutation(AUTH_USER);
    const [requestCode] = useMutation(REQUEST_CODE);

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    // SMS Auth
    const [auth, setAuth] = useState(false);
    const [pendingAuth, setPendingAuth] = useState(false);
    const [authLoader, setAuthLoader] = useState(true);
    const [rememberAuth, setRememberAuth] = useState(false);

    const [number, setNumber] = useState('');
    const [code, setCode] = useState('');

    // Delivery / pickup
    const [step, setStep] = useState(0); //1: 
    const [deliveryMethod, setDeliveryMethod] = useState();
    const [deliveryAddress, setDeliveryAddress] = useState({
        zip: '',
        street: '',
        comment: ''
    })
    const [pickupAddres, setPickupAddress] = useState();

    // Payment
    const [clientName, setClientName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [card, setCard] = useState({ ccn: '', mmyy: '', ccv: '' });
    const [termsAcceptance, setTermsAcceptance] = useState(false);

    const [availableZipCodes, setAvailableZipCodes] = useState([]);

    const { branches } = useBranches();
    useEffect(() => {
        if (branches && !availableZipCodes.length) {
            setAvailableZipCodes([...new Set(branches.map(branch => branch.homeDeliveryPostalCodes).flat().sort((a, b) => a - b))]);
        }
        if (availableZipCodes && !deliveryAddress.zip) {
            setDeliveryAddress({ ...deliveryAddress, zip: availableZipCodes[0] });
        }
    }, [branches])


    useEffect(() => {
        if (!auth) {
            let token = getToken();
            if (token) {
                token = decodeToken(token);
                ((token.exp * 1000) > new Date().getTime()) ? setAuth(true) : deleteToken();
            }
        } else {
            setAuthLoader(false);
        }
    });


    // Auth actions
    const sendAuthSms = async () => {
        // validate input
        if (!number || !number.length) {
            toast('Það vantar símanúmer', { type: 'error' });
            return;
        }

        // send auth sms
        try {
            const { data } = await requestCode({ variables: { input: { phone: number } } });
            setPendingAuth(true);
        } catch (err) {
            toast('Eitthvað fór úrskeiðis við að senda staðfestingarsms, vinsamlegast reyndu aftur', { type: 'error' });
        }
    }

    const submitAuthCode = async () => {
        if (!code || code.length !== 4) {
            toast('Kóði ekki á réttu formi', { type: 'error' });
            return;
        }

        try {
            const { data } = await authUser({ variables: { input: { phone: number, code: Number(code) } } });
            setToken(data.userAuth.token);
            setAuth(true);
        } catch (err) {
            toast('Kóði rangur', { type: 'error' });
        }
    }


    const submitDeliveryForm = () => {
        if (!deliveryAddress.zip) {
            toast('Póstnúmer ekki valið', { type: 'error' });
            return;
        }

        if (!deliveryAddress.street) {
            toast('Það vantar heimilisfang', { type: 'error' });
            return;
        }

        console.log(deliveryAddress);

        console.log('here');


        setStep(1);
    }

    const submitPickupForm = (branch) => {
        setPickupAddress(branch);
        setStep(1);
    }


    const submitPaymentSelectionForm = () => {
        if (!clientName || !clientName.length) {
            toast('Það vantar nafn á pöntunina', { type: 'error' });
            return;
        }

        if (paymentMethod == 'Card') {
            setStep(2);
        } else if (paymentMethod == 'Netgiro') {

        } else {
            submitOrder();
        }

    }



    // Order submission
    const submitOrder = () => {
        // TODO: validate and post route
        // reroute to /order/id on completion
        try {
            console.log('cart', cart);
            console.log('submitting order m8');
            props.history.push('/order');
        } catch (err) {
            console.log('err', err)
        }
    }


    // TODO: handle closed disclaimer

    // Auth
    if (!auth) {
        return !pendingAuth ?
            (
                <Section title={'Auðkenning'}>
                    <Form
                        title={'Símanúmer'}
                        ctaTitle={'Senda öryggiskóða'}
                        ctaAction={() => sendAuthSms()}
                    >
                        <p>Þú færð sendan staðfestingarkóða til þess að halda áfram</p>
                        <Input
                            label={'Símanúmer'}
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </Form>
                </Section>
            )
            :
            (
                <Section title={'Auðkenning'}>
                    <Form
                        title={'Staðfestingarkóði'}
                        ctaTitle={'Auðkenna'}
                        ctaAction={() => submitAuthCode()}
                    >
                        <p>Staðfestingarkóði hefur verið sendur í símanúmerið <b>{number}</b>. Stimplaðu inn kóðann hér að neðan.</p>
                        <Input
                            label={'Staðfestingarkóði'}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        {/* <CheckBox
                            checked={rememberAuth}
                            onChange={(e => setRememberAuth(e.target.checked))}
                            label={'Muna skráningu'}
                        /> */}
                    </Form>
                </Section>
            )
    }

    // Forms
    const deliveryMethodForm = (
        <Section title={'Sækja eða senda?'} >
            <Form
                // title={'Dalvegur 2'}
                subtitle={'Sækja pöntunina í Castello Dalvegi eða Dalshrauni'}
                ctaTitle={'Sækja'}
                ctaAction={() => setDeliveryMethod('pickup')}
            />
            <Form
                // title={'Dalvegur 2'}
                subtitle={`Fá pöntunina heimsenda í eitt af eftirfarandi póstnúmer: ${availableZipCodes}`}
                ctaTitle={'Fá heimsent'}
                ctaAction={() => setDeliveryMethod('delivery')}
            />
        </Section>
    )

    const pickupForm = (
        <Section title={'Hvert viltu sækja'} >
            {
                branches && branches.map((branch, i) => (
                    <Form
                        key={i}
                        title={branch.name}
                        subtitle={branch.address.city}
                        ctaTitle={'Sækja'}
                        ctaAction={() => submitPickupForm(branch.name)}
                    >
                        <p>Sun-Fim: {branch.openingHours['mon'].from}-{branch.openingHours['mon'].to}</p>
                        <p>Fös-Lau: {branch.openingHours['fri'].from}-{branch.openingHours['fri'].to}</p>
                    </Form>
                ))
            }
        </Section >
    )

    const deliveryForm = (
        <Section title={'Hvert eigum við að koma?'}>
            <Form
                ctaTitle={'Panta'}
                ctaAction={() => submitDeliveryForm()}
            >

                <Select
                    label={'Póstnúmer'}
                    value={deliveryAddress.zip}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, zip: e.target.value })}
                    options={availableZipCodes.map(zip => ({ value: zip, label: zip }))}
                />
                <Input
                    label={'Heimilisfang'}
                    placeholder={'Lautarvegur 38'}
                    value={deliveryAddress.street}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                />
                <Input
                    label={'Athugasemdir'}
                    value={deliveryAddress.comment}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, comment: e.target.value })}
                />
            </Form>
        </Section>
    )

    const paymentSelectionForm = (
        <Section title={'Þín pöntun'}>
            <Form
                title={'Greiðslumáti'}
                ctaTitle={'Greiða'}
                ctaAction={() => submitPaymentSelectionForm()}
            >
                <CheckBox
                    checked={paymentMethod === 'Card'}
                    onChange={e => setPaymentMethod('Card')}
                    label={'Kort Debet/Kredit'}
                />
                {/* <CheckBox
                    checked={paymentMethod === 'Netgiro'}
                    onChange={e => setPaymentMethod('Netgiro')}
                    label={'Netgiro'}
                /> */}
                <CheckBox
                    checked={paymentMethod === 'Payonarrival'}
                    onChange={e => setPaymentMethod('Payonarrival')}
                    label={'Við afhendingu'}
                />
                <Input
                    label={'Nafn'}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                />
            </Form>
        </Section>
    )

    const paymentForm = (
        <Section title={'Þín pöntun'}>
            <Form
                ctaTitle={'Greiðslumáti'}
                ctaAction={() => submitOrder()}
            >
                <Input
                    label={'Kortanúmer'}
                    value={card.ccn}
                    onChange={(e) => setCard({ ...card, ccn: e.target.value })}
                />
                <Input
                    label={'Gildistími'}
                    value={card.mmyy}
                    onChange={(e) => setCard({ ...card, mmyy: e.target.value })}
                />
                <Input
                    label={'Öryggiskóði (CV)'}
                    value={card.ccv}
                    onChange={(e) => setCard({ ...card, ccv: e.target.value })}
                />
                <CheckBox
                    checked={termsAcceptance}
                    onChange={e => setTermsAcceptance(e.target.checked)}
                    label={'Ég samþykki greiðsluskilmála Castello'}
                />
            </Form>
        </Section>
    )

    let currentForm;
    switch (step) {
        case 0:
            currentForm = !deliveryMethod ?
                deliveryMethodForm
                :
                deliveryMethod === 'pickup' ? pickupForm : deliveryForm
            break;
        case 1:
            currentForm = paymentSelectionForm;
            break;
        case 2:
            currentForm = paymentForm;
            break;
    }

    return currentForm;
}

export default CheckoutPage;