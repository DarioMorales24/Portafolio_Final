export default function TechIcon({ name, size = 40 }) {
    return (
        <img
        src={`tech/${name}.svg`}
        alt=""
        width={size}
        height={size}
        className="object-contain"
        />
    );
}