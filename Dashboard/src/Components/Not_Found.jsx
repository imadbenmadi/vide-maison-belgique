import Not_Found_image from "../../public/NotFound.png";
import { Link } from "react-router-dom";

function Not_Found() {
    return (
        <div
            className="flex items-center justify-center 
      text-gray font-bold md:pt-10 text-gray_v"
        >
            <div className="p-8 bg-white rounded-md shadow-lg text-center">
                <h1 className="text-3xl md:text-5xl mb-4 ">
                    Oups ! Cette page est introuvable
                </h1>
                <p className="text-lg mb-8 text-gray">
                    La page que vous recherchez est peut-être en cours de
                    construction ou a été déplacée.
                </p>
                <img
                    src={Not_Found_image}
                    alt="En construction"
                    className=" w-32 h-32 md:w-64 md:h-64 mx-auto mb-8 object-cover"
                />
                <p className="text-sm ">
                    Vérifiez l'URL ou retournez à la{" "}
                    <Link to={"/"} className=" text-green_v select-none">
                        page d'accueil.
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Not_Found;
