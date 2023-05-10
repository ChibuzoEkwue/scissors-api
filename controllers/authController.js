import Users from "../model/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create New user
export const createUser = async (req, res) => {
	try {
		// Check if username or email is in use
		const checkExists = await Users.findOne({
			$or: [{ email: req.body.email }, { username: req.body.username }],
		});
		// return an error if so
		if (checkExists) {
			throw new Error("Username or Email is already in use");
		}

		// create new user
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const newUser = await Users.create({
			...req.body,
			password: hash,
		});

		const { password, ...others } = newUser._doc;

		res.status(201).json(others);
	} catch (error) {
		res.status(500).json({ errorMsg: error.message });
	}
};

export const login = async (req, res) => {
	try {
		// Check for username either email
		const user = await Users.findOne({
			$or: [{ email: req.body.user }, { username: req.body.user }],
		});
		// return an error if so
		if (!user) {
			throw new Error("Invalid credentials");
		}
		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!isPasswordCorrect) {
			throw new Error("Invalid credentials");
		}

		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT
		);
		const { password, isAdmin, ...others } = user._doc;
		res
			.cookie("access_token", token, { httpOnly: true })
			.status(201)
			.json(others);

            
	} catch (error) {
		res.status(500).json({ errorMsg: error.message });
	}
};
