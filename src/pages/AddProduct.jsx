import { useEffect, useState } from "react";
import apiClient from "../components/services/api_client";
import { useForm } from "react-hook-form";
import authApiClient from "../components/services/auth_api_client";

const AddProduct = () => {
	const [categories, setCategories] = useState([]);
	const [productId, setProductId] = useState(null);

	// to show image in the image upload field
	const [previewImages, setPreviewImages] = useState([]);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);

	// react hook form functionalities
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// fetching category
	useEffect(() => {
		apiClient.get("/categories/").then((res) => {
			setCategories(res.data);
		});
	}, []);

	// product add form function
	const handleProductForm = async (data) => {
		try {
			const productRes = await authApiClient.post("/products/", data);

			//  status: 201
			if (productRes.status === 201) {
				setProductId(productRes.data.id);
				// alert("product added successfully.");
			}
		} catch (err) {
			console.log(err);
		}
	};

	// handle image change
	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages(files);
		setPreviewImages(files.map((file) => URL.createObjectURL(file)));
	};

	// handle image upload
	const handleImageUpload = async () => {
		if (!images.length) return alert("Please select images");

		setLoading(true);
		try {
			for (const image of images) {
				const formData = new FormData();
				formData.append("image", image);

				const response = await authApiClient.post(
					`/products/${productId}/images/`,
					formData
				);

				// status : 201
			}

			setLoading(false);
			alert("Images uploaded successfully");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

			{!productId ? (
				<form
					onSubmit={handleSubmit(handleProductForm)}
					className="space-y-4"
				>
					<div>
						<label className="block text-sm font-medium">
							Product Name
						</label>
						<input
							{...register("name", { required: true })}
							className="input input-bordered w-full"
							placeholder="Product Name"
						/>
						{errors.name && (
							<p className="text-red-500 text-xs">
								This field is required
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium">
							Description
						</label>
						<textarea
							{...register("description", { required: true })}
							className="textarea textarea-bordered w-full"
							placeholder="Description"
						></textarea>
						{errors.description && (
							<p className="text-red-500 text-xs">
								This field is required
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium">
							Price
						</label>
						<input
							type="text"
							{...register("price", {
								required: "This Field is required",
								validate: (value) => {
									const parsedValue = parseFloat(value);
									return (
										!isNaN(parsedValue) ||
										"Please enter a valid number!"
									);
								},
							})}
							className="input input-bordered w-full"
							placeholder="Price"
						/>
						{errors.price && (
							<p className="text-red-500 text-xs">
								{errors.price.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium">
							Stock Quantity
						</label>
						<input
							type="number"
							{...register("stock", { required: true })}
							className="input input-bordered w-full"
							placeholder="Stock"
						/>
						{errors.stock && (
							<p className="text-red-500 text-xs">
								This field is required
							</p>
						)}
					</div>

					{/* Dropdown for categories */}
					<div>
						<label className="block text-sm font-medium">
							Category
						</label>
						<select
							{...register("category", { required: true })}
							className="select select-bordered w-full"
						>
							<option value="">Select a category</option>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
						{errors.category && (
							<p className="text-red-500 text-xs">
								This field is required
							</p>
						)}
					</div>

					<button type="submit" className="btn btn-primary w-full">
						Add Product
					</button>
				</form>
			) : (
				<div>
					<h3 className="text-lg font-medium mb-2">
						Upload Product Images
					</h3>
					<input
						type="file"
						multiple
						accept="image/*"
						className="file-input file-input-bordered w-full"
						onChange={handleImageChange}
					/>

					{previewImages.length > 0 && (
						<div className="flex gap-2 mt-2">
							{previewImages.map((src, idx) => (
								<img
									key={idx}
									src={src}
									alt="Preview"
									className="w-16 h-16 rounded-md object-cover"
								/>
							))}
						</div>
					)}

					<button
						onClick={handleImageUpload}
						className="btn btn-primary w-full mt-2"
						disabled={loading}
					>
						{loading ? "Uploading..." : "Upload Image"}
					</button>
				</div>
			)}
		</div>
	);
};

export default AddProduct;
