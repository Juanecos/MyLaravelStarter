type Props = {
    mensaje: string;
};
export default function HolaMundo({ mensaje}): Props {
    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>{mensaje}</h1>
            <p>Esta página viene desde Inertia.</p>
        </div>
    );
}
