import { FormEvent, useState } from "react";
import cookies from "../../utils/cookies";
import getApiPath from "../../utils/getApiPath";

const CreateCourseForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        semester: "22-H2",
        description: "",
        grade: "A",
        urlLink: "",
        type: "O",
    });

    const handleSubmit = async (e: FormEvent) => {
        const apiUrl = getApiPath() + import.meta.env.VITE_CREATE_COURSE_URL;
        e.preventDefault();

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.get("TOKEN")}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(`Error submitting form:\n${data.errors[Object.keys(data.errors)[0]]}`);
            }
        } catch (e) {
            alert(`Error submitting form. Check if all fields are reasonable.`);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col justify-center">
                <label className="text-lg py-1">Name</label>
                <input
                    type="text"
                    name="name"
                    className="border-2 text-black rounded-md p-1"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Course name"
                    required
                />
            </div>
            <div className="flex flex-col justify-center">
                <label className="text-lg py-1">Semester</label>
                <select
                    name="semester"
                    id="semester"
                    className="border-2 text-black rounded-md p-1"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                >
                    <optgroup label="1st year">
                        <option>22-H2</option>
                        <option>23-H1</option>
                    </optgroup>
                    <optgroup label="2nd year">
                        <option>23-H2</option>
                        <option>24-H1</option>
                    </optgroup>
                    <optgroup label="3rd year">
                        <option>24-H2</option>
                        <option>25-H1</option>
                    </optgroup>
                </select>
            </div>
            <div className="flex flex-col justify-center">
                <label className="text-lg py-1">Description</label>
                <textarea
                    name="description"
                    className="border-2 text-black rounded-md p-1"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Short description of the course"
                    required
                />
            </div>
            <div className="flex flex-col justify-center">
                <label className="text-lg py-1">Grade</label>
                <select
                    name="grade"
                    id="grade"
                    className="border-2 text-black rounded-md p-1"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>Passed</option>
                    <option>Failed</option>
                </select>
            </div>
            <div className="flex flex-col justify-center">
                <label className="text-lg py-1">Link</label>
                <input
                    type="text"
                    name="urlLink"
                    className="border-2 text-black rounded-md p-1"
                    value={formData.urlLink}
                    onChange={handleChange}
                    placeholder="URL link to course page"
                    required
                />
            </div>
            <div className="flex flex-col justify-center">
                <label className="text-lg py-1">Type</label>
                <select
                    name="type"
                    id="type"
                    className="border-2 text-black rounded-md p-1"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <optgroup label="Obligatorily">
                        <option>O</option>
                    </optgroup>
                    <optgroup label="Additional">
                        <option>E</option>
                    </optgroup>
                </select>
            </div>
            <button
                type="submit"
                className="bg-gradient-to-t from-gray-400 via-gray-500 to-gray-600 shadow-md border-2 w-full text-white p-1 rounded-lg mt-3"
            >
                Create new course
            </button>
        </form>
    );
};

export default CreateCourseForm;
