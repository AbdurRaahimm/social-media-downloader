import { useNavigate, useRouteError } from "react-router-dom";
import Layout from '../components/Layout'

export default function ErrorPage() {
    const  error  = useRouteError();
    const navigate = useNavigate();
    return (
        <Layout>
            <div className='flex justify-center flex-col items-center py-10 space-y-3'>
                <h1 className="text-4xl">Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                {/* back  */}
                <button
                    onClick={() =>navigate("/")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go Back
                </button>
            </div>
        </Layout>
    )
}
