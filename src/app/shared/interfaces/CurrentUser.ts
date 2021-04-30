export interface CurrentUser {
	"error": boolean,
	"msg": string,
	"response": {
		"id": number,
		"firstName": string,
		"lastName": string,
		"emailId": string,
		"createdAt": string
	}
}