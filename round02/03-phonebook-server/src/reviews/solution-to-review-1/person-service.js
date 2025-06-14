/** @format */

import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async (newObject) => {
	const response = await axios.post(baseUrl, newObject);
	return response.data;
};

const update = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObject);
	return response.data;
};

const remove = async (id) => {
	await axios.delete(`${baseUrl}/${id}`);
};

export { getAll, create, update, remove };
