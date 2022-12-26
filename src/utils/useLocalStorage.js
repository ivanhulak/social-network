import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
	// getting stored value
	const saved = localStorage.getItem(key);
	const initial = JSON.parse(saved);
	return initial || defaultValue;
}

export const useLocalStorage = (keyName, initialValue) => {
	const [value, setValue] = useState(() => {
		return getStorageValue(keyName, initialValue);
	});

	useEffect(() => {
		localStorage.setItem(keyName, JSON.stringify(value));
	}, [keyName, value]);

	return [value, setValue];
}