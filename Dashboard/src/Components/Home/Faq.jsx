import React from "react";
import Faq_Card from "./Faq_Card";
function Faq({ data }) {
    if (!data) {
        return null;
    }
    if (data.length === 0) {
        return null;
    }
    return (
        <div>
            <div className=" my-6 flex flex-col gap-6">
                <div className=" flex flex-col items-center justify-center  w-[90%] pt-6">
                    {data &&
                        data.length > 0 &&
                        data?.map((faq) => {
                            return (
                                <Faq_Card
                                    key={faq.id}
                                    faq={faq}
                                    
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Faq;
