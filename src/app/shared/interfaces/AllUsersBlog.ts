export interface AllUsersBlog {
	"response": Array<any>
}

export interface AllBlogs {
	"id": number,
	"title": string,
	"description": string,
	"content": string,
	"createdAt": string,
	"user": {
		"id": number,
		"firstName": string,
		"lastName": string,
	}
	"commentItems": Array<any>,
	"mediaItems": Array<any>,
	"likeItems": Array<any>
}