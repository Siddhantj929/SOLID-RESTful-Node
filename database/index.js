const database = {
	users: [
		{
			name: "Siddhant",
			id: 0,
			stories: [0, 1]
		},
		{
			name: "Muskaan",
			id: 1,
			stories: [2, 3]
		}
	],
	stories: [
		{
			text: "Story 1 written by Siddhant Jain",
			id: 0,
			author: 0
		},
		{
			text: "Story 2 written by Siddhant Jain",
			id: 1,
			author: 0
		},
		{
			text: "Story 1 written by Muskaan Jain",
			id: 2,
			author: 1
		},
		{
			text: "Story 2 written by Muskaan Jain",
			id: 3,
			author: 1
		}
	]
};

const connectToDatabase = callback => {
	setTimeout(() => {
		callback(database);
	}, 3000);
};

exports.connectToDatabase = connectToDatabase;
