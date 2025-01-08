<div className="w-full h-[80vh] flex flex-col items-center justify-center">
    <h1 className="text-3xl font-semibold">Welcome to the Home Page</h1>
    <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <p>Phone: {data?.Contact_informations?.phone}</p>
        <p>Email: {data?.Contact_informations?.email}</p>
        <p>Instagram: {data?.Contact_informations?.instagram}</p>
        <p>Facebook: {data?.Contact_informations?.facebook}</p>
    </div>
    <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">About Page</h2>
        <p>{data?.About_page?.content}</p>
    </div>
    <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">Main Page</h2>
        <p>{data?.Main_page?.content}</p>
    </div>
    <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <ul>
            {data?.Faq &&
                data?.Faq.map((faq, index) => (
                    <li key={index}>
                        <p>{faq.question}</p>
                        <p>{faq.answer}</p>
                    </li>
                ))}
        </ul>
    </div>
    <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">Services</h2>
        <ul>
            {data?.Services &&
                data?.Services.map((service, index) => (
                    <li key={index}>
                        <p>{service.title}</p>
                        <p>{service.description}</p>
                    </li>
                ))}
        </ul>
    </div>
</div>;
