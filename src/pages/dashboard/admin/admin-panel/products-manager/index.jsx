import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const ProductsManager = () => {
    const router = useRouter();
    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);
    return (
        // Start Products Manager
        <div className="products-manager">
            <Head>
                <title>Tavlorify Store - Products Manager</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            <h1 className="welcome-msg mt-3 text-center">Hello To You In Products Manager Page</h1>
            <hr className="mb-3" />
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel/products-manager/add-product">Add Product</Link>
                <Link className="btn btn-danger manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel/products-manager/update-and-delete-products">Update And Delete Products</Link>
            </section>
            {/* End Content Section */}
        </div>
        // End Products Manager
    );
}

export default ProductsManager;