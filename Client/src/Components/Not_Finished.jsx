import Not_Finished_img from "../../public/Not_Finished.png";

function Not_Finished() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-10 bg-white rounded-lg shadow-lg text-center w-full max-w-lg">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700">
                    Sorry! This page is not ready yet
                </h1>
                <p className="text-lg mb-6 text-gray-700">
                    We are working hard to bring you something special. Please
                    check back later!
                </p>
                <img
                    src={Not_Finished_img}
                    alt="Under construction"
                    className="w-40 h-40 md:w-60 md:h-60 mx-auto mb-6 object-cover"
                />
                <p className="text-gray-600">
                    Thank you for your patience and understanding!
                </p>
            </div>
        </div>
    );
}

export default Not_Finished;
