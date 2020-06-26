import React from 'react';
import { Section, LocationCard } from '../components/UI';
import { useBranches } from '../hooks';


const LocationsPage = () => {
    const { branches, loading } = useBranches();

    console.log(branches);

    return (
        <Section>
            {
                branches ?.map(branch =>
                    <LocationCard
                        title={branch ?.address ?.street}
                        subtitle={branch ?.address ?.city}
                        openingHours={branch.openingHours}
                        times={[
                            {
                                label: 'Sótt',
                                value: branch.estimatedPickupTime
                            },
                            {
                                label: 'Sent',
                                value: branch.estimatedDeliveryTime
                            }
                        ]}
                    />
                )
            }
        </Section>
    )
}

export default LocationsPage;