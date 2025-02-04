type HeadingProps = {
    label: string;
};
export function Heading({ label }: HeadingProps) {
    return (
        <div>
            <h1 className="font-bold text-4xl pt-6 text-green-500">{label}</h1>
        </div>
    );
}
export function SubHeading({ label }: HeadingProps) {
    return (
        <div>
            <h1 className="text-blue-300 text-md pt-1 px-4 pb-4">{label}</h1>
        </div>
    );
}

export function InputBox({ label,placeholder,onChange }:any) {
    return (
        <div>
            <div className="text-sm font-medium text-left py-2 text-orange-400">{label}</div>
            <input type="text" placeholder={placeholder} className="w-full border rounded text-slate-400 bg-white" onChange={onChange}/>
        </div>
    );
}

export function Button({ label,onClick }:any) {
    return (
        <div>
            <button onClick={onClick} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-2">{label}</button>
        </div>
    );
}

