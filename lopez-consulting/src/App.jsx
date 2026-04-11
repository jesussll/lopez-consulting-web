import { useState } from "react";
import "./App.css";

export default function App() {
  const whatsappNumber = "5491130956786";
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwGIZ7l0kxL-woAoDo4_VdP5Au6U89eMgO7CeKqBpuvowEMkfjb3Ef6PH6iXN-7WGvd/exec";

  const baseWhatsappMessage =
    "Hola, vi la web de López Consulting y quiero consultar por sus servicios.";

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
      text: "Diseño sitios modernos, rápidos y profesionales para mostrar tus servicios y convertir visitas en consultas.",
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

  const plans = [
    {
      name: "Negocio Standard",
      badge: "Ideal para empezar",
      subtitle: "Una base sólida y profesional para negocios que quieren presencia online.",
      items: [
        "Landing page profesional",
        "Botón directo a WhatsApp",
        "Formulario conectado a Google Sheets",
        "Diseño adaptable a celular",
        "Presentación clara de servicios",
      ],
      whatsappText:
        "Hola, quiero consultar por el plan Negocio Standard de López Consulting.",
    },
    {
      name: "Negocio Pro",
      badge: "Más completo",
      subtitle: "Pensado para marcas que buscan más presencia, estructura y conversión.",
      items: [
        "Web más completa y personalizada",
        "Secciones extra para servicios o productos",
        "Mayor impacto visual y comercial",
        "Base lista para seguir creciendo",
        "Estructura más premium de marca",
      ],
      whatsappText:
        "Hola, quiero consultar por el plan Negocio Pro de López Consulting.",
    },
  ];

  const paymentMethods = [
    {
      name: "Transferencias",
      text: "Consultame los datos bancarios para realizar el pago.",
      whatsappText:
        "Hola, quiero consultar los datos para pagar por Transferencia.",
    },
    {
      name: "Efectivo",
      text: "Consultame disponibilidad y modalidad de pago en efectivo.",
      whatsappText: "Hola, quiero consultar el pago en Efectivo.",
    },
    {
      name: "Binance",
      text: "Consultame el pago mediante Binance.",
      whatsappText: "Hola, quiero consultar el pago por Binance.",
    },
    {
      name: "Zelle",
      text: "Consultame el pago mediante Zelle.",
      whatsappText: "Hola, quiero consultar el pago por Zelle.",
    },
  ];

  const faqs = [
    {
      q: "¿Hacés páginas web a medida?",
      a: "Sí, cada proyecto se adapta al tipo de negocio, a la imagen de marca y a lo que quieras comunicar.",
    },
    {
      q: "¿Los Excel son personalizados?",
      a: "Sí, se diseñan según lo que necesites controlar: ventas, compras, stock, gastos o ingresos.",
    },
    {
      q: "¿También hacés dashboards en Power BI?",
      a: "Sí, puedo desarrollar tableros para ventas, seguimiento comercial y análisis de indicadores.",
    },
    {
      q: "¿Cómo se trabaja?",
      a: "Primero me contás tu necesidad, después te propongo una solución y avanzamos con el desarrollo.",
    },
  ];

  const openWhatsApp = (customMessage = baseWhatsappMessage) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      customMessage
    )}`;
    window.open(url, "_blank");
  };

  const goTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
        body: JSON.stringify({
          ...formData,
          origen: "Web López Consulting",
          fecha: new Date().toISOString(),
        }),
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
        <div className="brand" onClick={() => goTo("inicio")}>
          <div className="brand-logo-wrap">
            <img
              src="/logo-nuevo.png"
              alt="López Consulting"
              className="brand-logo"
            />
          </div>

          <div className="brand-text">
            <h2>López Consulting</h2>
            <p>Soluciones digitales para negocios</p>
          </div>
        </div>

        <nav className="nav">
          <button onClick={() => goTo("servicios")}>Servicios</button>
          <button onClick={() => goTo("planes")}>Planes</button>
          <button onClick={() => goTo("pagos")}>Pagos</button>
          <button onClick={() => goTo("contacto")}>Contacto</button>
        </nav>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-tag">WEB · EXCEL · POWER BI · DISEÑO</span>

            <h1 className="hero-title">
              Diseño digital
              <br />
              <span>que potencia tu negocio</span>
            </h1>

            <p className="hero-text">
              Desarrollo páginas web, herramientas de control en Excel,
              dashboards en Power BI y piezas visuales para que tu negocio se
              vea mejor, trabaje mejor y venda mejor.
            </p>

            <div className="hero-pills">
              <span>Atención personalizada</span>
              <span>Soluciones a medida</span>
              <span>Imagen profesional</span>
            </div>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => openWhatsApp()}>
                Solicitar presupuesto
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => goTo("servicios")}
              >
                Ver servicios
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-logo-card">
              <div className="hero-logo-ring"></div>
              <img
                src="/logo-nuevo.png"
                alt="López Consulting"
                className="hero-logo"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="section">
        <div className="section-heading">
          <span className="section-label">Servicios</span>
          <h2>Creamos soluciones digitales a medida</h2>
          <p>
            Una propuesta moderna para negocios que quieren destacarse, ordenar
            su operación y tener una presencia digital más fuerte.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card" key={index}>
              <div className="service-dot"></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="planes" className="section">
        <div className="section-heading center">
          <span className="section-label">Planes</span>
          <h2>Elegí la opción ideal para tu negocio</h2>
          <p>
            Podemos arrancar con una base profesional o ir por una solución más
            completa y potente.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <article className="plan-card" key={index}>
              <span className="plan-badge">{plan.badge}</span>
              <h3>{plan.name}</h3>
              <p className="plan-subtitle">{plan.subtitle}</p>

              <ul className="plan-list">
                {plan.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>

              <button
                className="btn btn-primary full"
                onClick={() => openWhatsApp(plan.whatsappText)}
              >
                Consultar este plan
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="pagos" className="section">
        <div className="section-heading center">
          <span className="section-label">Métodos de pago</span>
          <h2>Elegí cómo querés pagar</h2>
          <p>
            Consultame por WhatsApp el medio que prefieras y te paso los datos.
          </p>
        </div>

        <div className="payments-grid">
          {paymentMethods.map((method, index) => (
            <article className="payment-card" key={index}>
              <h3>{method.name}</h3>
              <p>{method.text}</p>
              <button
                className="btn btn-secondary full"
                onClick={() => openWhatsApp(method.whatsappText)}
              >
                Consultar pago
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="section-label">Preguntas frecuentes</span>
          <h2>Lo que suelen consultarme</h2>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <article className="faq-card" key={index}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="section">
        <div className="contact-box">
          <div className="contact-left">
            <div className="contact-logo-wrap">
              <img
                src="/logo-nuevo.png"
                alt="López Consulting"
                className="contact-logo"
              />
            </div>

            <h3>López Consulting</h3>
            <p>
              Si querés una web, un Excel de control, un dashboard o una pieza
              visual profesional, escribime y lo vemos.
            </p>

            <a
              className="contact-whatsapp"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                baseWhatsappMessage
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp directo
            </a>
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

            <button
              type="submit"
              className="btn btn-primary full"
              disabled={sending}
            >
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

      <button className="whatsapp-float" onClick={() => openWhatsApp()}>
        WhatsApp
      </button>
    </div>
  );
}