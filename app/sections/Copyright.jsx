export default function Copyright() {
  return (
    <p className="text-center p-2 text-sm cursor-default">
      Design by{" "}
      <a
        href="https://www.behance.net/Reshetnikov"
        target="_blank"
        className="text-[#ea4c89] font-medium"
        rel="noreferrer"
      >
        Dmitry Reshetnikov
      </a>{" "}
      <br className={`sm:hidden`} />& Built by{" "}
      <a
        href="https://fachryafrz.vercel.app"
        target="_blank"
        className="text-[#ea4c89] font-medium"
        rel="noreferrer"
      >
        Fachry Dwi Afriza
      </a>
    </p>
  );
}
