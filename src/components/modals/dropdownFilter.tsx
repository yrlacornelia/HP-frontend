import React, { useState } from 'react';

type DropdownFilterProps = {
    selectedHouses: string[];
    setSelectedHouses: (houses: string[]) => void;
};

const DropdownFilter = ({ selectedHouses, setSelectedHouses }:DropdownFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedHouses([...selectedHouses, value]);
        } else {
            setSelectedHouses(selectedHouses.filter(house => house !== value));
        }
    };

    return (
        <div className='relative'>
            <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Filter by House
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <div
                id="dropdown"
                className={`z-10 ${isOpen ? 'block' : 'hidden'} bg-white absolute z-10 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input 
                                id="checkbox-item-slytherin" 
                                type="checkbox" 
                                value="slytherin" 
                                checked={selectedHouses.includes("slytherin")}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                            />
                            <label htmlFor="checkbox-item-slytherin" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Slytherin
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input 
                                id="checkbox-item-gryffindor" 
                                type="checkbox" 
                                value="gryffindor" 
                                checked={selectedHouses.includes("gryffindor")}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                            />
                            <label htmlFor="checkbox-item-gryffindor" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Gryffindor
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DropdownFilter;
