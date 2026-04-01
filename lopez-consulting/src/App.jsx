import { useState } from "react";
import "./App.css";

export default function App() {
  const whatsappNumber = "5491130956786";
  const whatsappMessage =
    "Hola, vi la web de López Consulting y quiero consultar por sus servicios.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyRZImK7N-LEMvDBUqqxN92qvb3WBnerxMo6K30Fi32j4Y-J2U3N9Af6vNgF9Hr2lV8/exec";

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const services = [
    {
      title: "Páginas web para negocios",
      text: "Diseño sitios modernos, rápidos y visualmente profesionales para mostrar tus servicios y convertir visitas en consultas.",
    },
    {
      title: "Excels de control",
      text: "Armo libros de Excel personalizados para ventas, compras, stock, gastos e ingresos, pensados para ordenar tu negocio.",
    },
    {
      title: "Dashboards con Power BI",
      text: "Creo tableros visuales con KPIs, evolución de ventas, análisis por producto y métricas clave para decidir mejor.",
    },
    {
      title: "Flyers y diseño visual",
      text: "Diseño flyers e imágenes para promociones, redes sociales y comunicación profesional de tu marca.",
    },
  ];

  const advantages = [
    "Diseño moderno y profesional",
    "Soluciones pensadas para negocios reales",
    "Atención personalizada",
    "Entrega clara y funcional",
    "Optimización visual para vender mejor",
    "Imagen digital más sólida",
  ];

  const faqs = [
    {
      q: "¿Hacés páginas web a medida?",
      a: "Sí, cada proyecto se adapta a tu negocio, tu estilo y lo que necesitás mostrar o vender.",
    },
    {
      q: "¿Los Excel son personalizados?",
      a: "Sí, se desarrollan según tu necesidad: ventas, compras, stock, gastos o control general.",
    },
    {
      q: "¿También hacés tableros en Power BI?",
      a: "Sí, puedo crear dashboards de ventas, seguimiento comercial y análisis de indicadores.",
    },
    {
      q: "¿Cómo es el proceso de trabajo?",
      a: "Primero vemos tu necesidad, luego te propongo una solución y avanzamos con el desarrollo.",
    },
  ];

  const openWhatsApp = () => {
    window.open(whatsappUrl, "_blank");
  };

  const goTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatusMessage("");

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success || result.result === "success") {
        setStatusMessage("Consulta enviada correctamente.");
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          mensaje: "",
        });
      } else {
        setStatusMessage("Hubo un problema al enviar la consulta.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Error al conectar con el formulario.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="site">
      <header className="topbar">
        <div className="brand">
          <img src="/logo.png" alt="López Consulting" className="brand-logo" />
          <div>
            <h2>López Consulting</h2>
            <p>Soluciones digitales para negocios</p>
          </div>
        </div>

        <nav className="nav">
          <button onClick={() => goTo("servicios")}>Servicios</button>
          <button onClick={() => goTo("ventajas")}>Ventajas</button>
          <button onClick={() => goTo("contacto")}>Contacto</button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-glow hero-glow-left"></div>
        <div className="hero-glow hero-glow-right"></div>

        <div className="hero-content">
          <span className="hero-tag">WEB · EXCEL · POWER BI · DISEÑO</span>

          <h1 className="hero-title">
            Diseño digital
            <br />
            <span>que potencia tu negocio</span>
          </h1>

          <p className="hero-text">
            Desarrollo páginas web, herramientas de control en Excel, dashboards
            en Power BI y piezas visuales para que tu negocio se vea mejor,
            trabaje mejor y venda mejor.
          </p>

          <div className="hero-info">
            <div className="hero-pill">✔ Atención personalizada</div>
            <div className="hero-pill">✔ Soluciones a medida</div>
            <div className="hero-pill">✔ Imagen profesional</div>
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={openWhatsApp}>
              Solicitar presupuesto
            </button>
            <button className="btn btn-secondary" onClick={() => goTo("servicios")}>
              Ver servicios
            </button>
          </div>
        </div>
      </section>

      <section id="servicios" className="services-section">
        <div className="section-heading">
          <span className="section-label">Servicios</span>
          <h2>Creamos soluciones digitales a medida</h2>
          <p>
            Una propuesta moderna para negocios que quieren destacarse, ordenar
            su operación y tener una presencia digital más fuerte.
          </p>
        </div>

        <div className="services-panel">
          {services.map((service, index) => (
            <div className="service-item" key={index}>
              <div className="service-bullet"></div>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="ventajas" className="advantages-section">
        <div className="section-heading center">
          <span className="section-label">Ventajas</span>
          <h2>Una presencia más moderna y profesional</h2>
        </div>

        <div className="advantages-grid">
          {advantages.map((item, index) => (
            <div className="adv-card" key={index}>
              <span>✦</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="process-card">
          <span className="section-label">Proceso</span>
          <h2>Trabajemos de forma simple y clara</h2>
          <div className="process-list">
            <div className="process-step">
              <strong>01</strong>
              <p>Me contás tu idea o necesidad</p>
            </div>
            <div className="process-step">
              <strong>02</strong>
              <p>Te propongo una solución</p>
            </div>
            <div className="process-step">
              <strong>03</strong>
              <p>Desarrollo el proyecto</p>
            </div>
            <div className="process-step">
              <strong>04</strong>
              <p>Revisamos y ajustamos detalles</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading">
          <span className="section-label">Preguntas frecuentes</span>
          <h2>Lo que suelen consultarme</h2>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div className="faq-card" key={index}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div className="contact-box">
          <div className="contact-left">
            <img src="/logo.png" alt="López Consulting" className="contact-logo" />
            <h3>López Consulting</h3>
            <p>
              Si querés una web, un Excel de control, un dashboard o una pieza
              visual profesional, escribime y lo vemos.
            </p>

            <div className="contact-direct">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp directo
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Enviame un mensaje</h3>

            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
            />

            <textarea
              name="mensaje"
              placeholder="Contame qué necesitás"
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="btn btn-primary full" disabled={sending}>
              {sending ? "Enviando..." : "Enviar consulta"}
            </button>

            {statusMessage && <p className="form-status">{statusMessage}</p>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div>
          <h3>López Consulting</h3>
          <p>Webs, Excel, Power BI y diseño para negocios</p>
        </div>
        <span>© 2026 López Consulting</span>
      </footer>

      <button className="whatsapp-float" onClick={openWhatsApp}>
        WhatsApp
      </button>
    </div>
  );
}