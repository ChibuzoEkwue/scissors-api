import Links from "../model/Links.js";
import shortid from "shortid";

export const createLink = async (req, res) => {
	try {
		const shortId = shortid.generate();
		const newSissors = await Links.create({
			...req.body,
			userId: req.user._id,
			shortId,
		});

		res.status(201).json(newSissors);
	} catch (error) {
		res.status(500).json({ errorMsg: error.message });
	}
};

export const createCustomLink = async (req, res) => {
	const { customID } = req.body;
	try {
		const linkExists = await Links.findOne({ shortId: customID });

		if(linkExists){
			throw new Error(`${customID} already in use`)
		}

		const newSissors = await Links.create({
			...req.body,
			userId: req.user._id,
			shortId: customID,
		});

		res.status(201).json(newSissors);
	} catch (error) {
		res.status(500).json({ errorMsg: error.message });
	}
};

export const myLinks = async (req, res) => {
	try {
		const links = await Links.find({ userId: req.user._id }).select({
			desc: 1,
		});
		res.status(201).json(links);
	} catch (error) {
		res.status(500).json({ errorMsg: error.message });
	}
};

export const linksDetail = async (req, res) => {
	try {
		const links = await Links.findOne({ _id: req.params.id });
		res.status(201).json(links);
	} catch (error) {
		res.status(500).json({ errorMsg: error.message });
	}
};

export const updateLinks = async (req, res) => {
	try {
		const updatedLink = await Links.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(201).json(updatedLink);
	} catch (error) {
		res.status(500).json({ errorMsg: error.message });
	}
};

export const deleteLink = async (req, res) => {
	try {
		await Links.findByIdAndDelete(req.params.id);
		res.status(201).json({ msg: "Link deleted" });
	} catch (error) {
		res.status(500).json({ errorMsg: error.message });
	}
};
