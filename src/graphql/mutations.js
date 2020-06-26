import gql from 'graphql-tag'

export const REQUEST_CODE = gql`
	mutation requestCode ($input: UserInputType!) {
		requestCode(userInputType: $input) {
			message
		}
	}
`

export const AUTH_USER = gql`
	mutation userAuth ($input: LoginUserInputType!) {
		userAuth(userInputType: $input) {
			id
			phone
			name
			token
		}
	}
`

export const CALCULATE_SINGLE_PIZZA = gql`
	mutation calculateSinglePizza ($input: UserOrderPizzaCalculateInputType!) {
		calculateSinglePizza(calculatePizzaInput: $input) {
			price
		}
	}
`