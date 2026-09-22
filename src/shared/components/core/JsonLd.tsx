type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
  nonce?: string;
};

// Serializa JSON-LD escapando "<" para impedir el cierre prematuro del <script>
// si algun dato contuviera HTML. Es el unico punto del sitio con inyeccion de script.
export function JsonLd({ data, nonce }: Props) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: json }} />;
}
