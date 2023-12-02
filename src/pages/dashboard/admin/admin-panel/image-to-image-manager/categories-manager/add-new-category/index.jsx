import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState, useEffect } from "react";
import Axios from "axios";
import validations from "../../../../../../../../public/global_functions/validations";
import { useRouter } from "next/router";

export default function AddNewCategory() {

    const [categoryName, setCategoryName] = useState("");

    const [categoryImageFile, setCategoryImageFile] = useState("");

    const [styleName, setStyleName] = useState("");

    const [stylePrompt, setStylePrompt] = useState("");

    const [styleNegativePrompt, setStyleNegativePrompt] = useState("");

    const [ddim_steps, setDdim_steps] = useState("");

    const [strength, setStrength] = useState("");

    const [styleImageFile, setStyleImageFile] = useState("");

    const [isAddingStatus, setIsAddingStatus] = useState(false);

    const [isSuccessStatus, setIsSuccessStatus] = useState(false);

    const [isErrorStatus, setIsErrorStatus] = useState(false);

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);

    const addNewCategory = async (e) => {
        e.preventDefault();
        setFormValidationErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "categoryName",
                value: categoryName,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "categoryImageFile",
                value: categoryImageFile,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                    isImage: {
                        msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
                    },
                },
            },
            {
                name: "styleName",
                value: styleName,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "stylePrompt",
                value: stylePrompt,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "styleNegativePrompt",
                value: styleNegativePrompt,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "ddim_steps",
                value: ddim_steps,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "strength",
                value: strength,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "styleImageFile",
                value: styleImageFile,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                    isImage: {
                        msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
                    },
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            let formData = new FormData();
            formData.append("categoryName", categoryName);
            formData.append("categoryImgFile", categoryImageFile);
            formData.append("styleName", styleName);
            formData.append("stylePrompt", stylePrompt);
            formData.append("styleNegativePrompt", styleNegativePrompt);
            formData.append("ddim_steps", ddim_steps);
            formData.append("strength", strength);
            formData.append("styleImgFile", styleImageFile);
            setIsAddingStatus(true);
            try {
                const res = await Axios.post(`${process.env.BASE_API_URL}/image-to-image/categories/add-new-category`, formData);
                const result = await res.data;
                if (result === "Add New Category And First Style For Image To Image Page Is Successfuly !!") {
                    setIsAddingStatus(false);
                    setIsSuccessStatus(true);
                    let successTimeout = setTimeout(() => {
                        setIsSuccessStatus(false);
                        clearTimeout(successTimeout);
                    }, 2000);
                }
            }
            catch (err) {
                console.log(err);
                setIsErrorStatus(true);
                let errorTimeout = setTimeout(() => {
                    setIsErrorStatus(false);
                    clearTimeout(errorTimeout);
                }, 2000);
            }
        }
    }

    return (
        <div className="add-new-categoty">
            <Head>
                <title>Tavlorify Store - Add New Category For Image To Image</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Hello To You In Add New Category Page For Image To Image</h1>
                    <form className="add-new-category-form w-50 mx-auto" onSubmit={addNewCategory}>
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["categoryName"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Category Name"
                            onChange={(e) => setCategoryName(e.target.value.trim())}
                        />
                        {formValidationErrors["categoryName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["categoryName"]}</p>}
                        <input
                            type="file"
                            className={`form-control p-2 ${formValidationErrors["categoryImageFile"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Category Image"
                            onChange={(e) => setCategoryImageFile(e.target.files[0])}
                        />
                        {formValidationErrors["categoryImageFile"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["categoryImageFile"]}</p>}
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["styleName"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter The First Style Name"
                            onChange={(e) => setStyleName(e.target.value.trim())}
                        />
                        {formValidationErrors["styleName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["styleName"]}</p>}
                        <textarea
                            style={{ resize: "none" }}
                            className={`form-control p-2 ${formValidationErrors["stylePrompt"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Style Prompt"
                            onChange={(e) => setStylePrompt(e.target.value.trim())}
                        ></textarea>
                        {formValidationErrors["stylePrompt"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["stylePrompt"]}</p>}
                        <textarea
                            style={{ resize: "none" }}
                            className={`form-control p-2 ${formValidationErrors["styleNegativePrompt"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Style Negative Prompt"
                            onChange={(e) => setStyleNegativePrompt(e.target.value.trim())}
                        ></textarea>
                        {formValidationErrors["styleNegativePrompt"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["styleNegativePrompt"]}</p>}
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["ddim_steps"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter The Ddim Steps"
                            onChange={(e) => setDdim_steps(e.target.value.trim())}
                        />
                        {formValidationErrors["ddim_steps"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["ddim_steps"]}</p>}
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["strength"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter The Strength"
                            onChange={(e) => setStrength(e.target.value.trim())}
                        />
                        {formValidationErrors["strength"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["strength"]}</p>}
                        <input
                            type="file"
                            className={`form-control p-2 ${formValidationErrors["styleImageFile"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Category Image"
                            onChange={(e) => setStyleImageFile(e.target.files[0])}
                        />
                        {formValidationErrors["styleImageFile"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["styleImageFile"]}</p>}
                        {!isAddingStatus && !isErrorStatus && !isSuccessStatus && <button type="submit" className="btn btn-success w-100 d-block mx-auto">Add Now</button>}
                        {isAddingStatus && <button type="submit" className="btn btn-warning w-100 d-block mx-auto" disabled>Adding Now ...</button>}
                        {isErrorStatus && <button type="submit" className="btn btn-danger w-100 d-block mx-auto" disabled>Sorry, Someting Went Wrong, Please Try Again</button>}
                        {isSuccessStatus && <button type="submit" className="btn btn-success w-100 d-block mx-auto" disabled>Adding Process Is Successfuly !!</button>}
                    </form>
                </div>
            </div>
        </div>
    );
}