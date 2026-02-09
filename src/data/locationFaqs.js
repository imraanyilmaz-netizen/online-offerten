export const faqs = {
    move: [
      {
        question: {
          de: "Was kostet ein Umzug in {city}?",
          en: "How much does a move cost in {city}?"
        },
        answer: [
          {
            de: "Die Kosten für einen Umzug in {city} hängen von verschiedenen Faktoren ab, wie der Wohnungsgrösse, der Distanz und den gewünschten Zusatzleistungen. Hier ist eine grobe Schätzung:",
            en: "The cost of a move in {city} depends on various factors, such as the apartment size, distance, and desired additional services. Here is a rough estimate:"
          },
          {
            type: 'table',
            caption: {
              de: "Richtpreise für einen Umzug in {city}",
              en: "Guide prices for a move in {city}"
            },
            data: [
              { size: '1.5 - 2 Zimmer', cost: '800 - 1,500 CHF' },
              { size: '2.5 - 3 Zimmer', cost: '1,200 - 2,000 CHF' },
              { size: '3.5 - 4.5 Zimmer', cost: '1,600 - 2,800 CHF' },
              { size: '5.5+ Zimmer / Haus', cost: '2,500 - 5,000+ CHF' }
            ]
          },
          {
            de: "Diese Preise sind Schätzungen. Für eine genaue Offerte empfehlen wir, unseren Kostenrechner zu verwenden oder direkt eine Anfrage zu starten.",
            en: "These prices are estimates. For an accurate quote, we recommend using our cost calculator or starting a request directly."
          },
          {
            type: 'calculator_link',
            link: '/tools/umzugskosten',
            text: {
              de: "Berechnen Sie Ihre Umzugskosten präzise.",
              en: "Calculate your moving costs precisely."
            },
            buttonText: {
              de: "Zum Umzugskostenrechner",
              en: "To the Moving Cost Calculator"
            }
          }
        ]
      },
      {
        question: {
          de: "Wie finde ich die beste Umzugsfirma in {city}?",
          en: "How do I find the best moving company in {city}?"
        },
        answer: [
          {
            de: "Der beste Weg ist, mehrere Offerten zu vergleichen. Achten Sie nicht nur auf den Preis, sondern auch auf die Bewertungen, die enthaltenen Leistungen (Versicherung, Verpackungsmaterial) und den Gesamteindruck. Über unsere Plattform erhalten Sie mit nur einer Anfrage bis zu 5 Offerten von geprüften Firmen aus {city}.",
            en: "The best way is to compare multiple quotes. Don't just look at the price, but also at the reviews, the included services (insurance, packing material), and the overall impression. Through our platform, you can receive up to 5 quotes from certified companies in {city} with just one request."
          }
        ]
      },
      {
        question: {
          de: "Bieten die Firmen auch Verpackungsmaterial an?",
          en: "Do the companies also offer packing material?"
        },
        answer: [
          {
            de: "Ja, die meisten unserer Partnerfirmen in {city} bieten hochwertiges Verpackungsmaterial wie Umzugskartons, Seidenpapier, Luftpolsterfolie und Klebeband an. Sie können das Material entweder kaufen oder mieten. Viele Firmen bieten auch einen kompletten Ein- und Auspackservice an, um Ihnen den Umzug noch einfacher zu machen.",
            en: "Yes, most of our partner companies in {city} offer high-quality packing materials such as moving boxes, tissue paper, bubble wrap, and tape. You can either buy or rent the material. Many companies also offer a complete packing and unpacking service to make your move even easier."
          }
        ]
      }
    ],
    clean: [
      {
        question: {
          de: "Was bedeutet 'Reinigung mit Abnahmegarantie'?",
          en: "What does 'cleaning with handover guarantee' mean?"
        },
        answer: [
          {
            de: "Eine Abnahmegarantie bedeutet, dass die Reinigungsfirma dafür haftet, dass die Wohnung von der Verwaltung oder dem Vermieter abgenommen wird. Sollte es bei der Übergabe Beanstandungen geben, ist die Firma verpflichtet, kostenlos nachzureinigen, bis alles in Ordnung ist. Oft ist ein Vertreter der Reinigungsfirma bei der Übergabe anwesend.",
            en: "A handover guarantee means that the cleaning company is liable for the apartment being accepted by the property management or landlord. If there are any complaints during the handover, the company is obliged to re-clean for free until everything is in order. Often, a representative of the cleaning company is present at the handover."
          }
        ]
      },
      {
        question: {
          de: "Was kosteteine Umzugsreinigung in {city}?",
          en: "How much does a move-out cleaning cost in {city}?"
        },
        answer: [
          {
            de: "Die Kosten für eine Umzugsreinigung mit Abnahmegarantie in {city} variieren je nach Wohnungsgrösse und Verschmutzungsgrad. Hier sind einige Richtwerte:",
            en: "The cost of a move-out cleaning with handover guarantee in {city} varies depending on the apartment size and the degree of dirt. Here are some guide prices:"
          },
          {
            type: 'table',
            caption: {
              de: "Richtpreise für eine Umzugsreinigung in {city}",
              en: "Guide prices for a move-out cleaning in {city}"
            },
            data: [
              { size: '1.5 - 2.5 Zimmer', cost: '500 - 900 CHF' },
              { size: '3.5 - 4.5 Zimmer', cost: '900 - 1,500 CHF' },
              { size: '5.5+ Zimmer / Haus', cost: 'ab 1,400 CHF' }
            ]
          },
          {
            de: "Für eine genaue und verbindliche Offerte starten Sie am besten eine Anfrage auf unserer Plattform.",
            en: "For an accurate and binding quote, it's best to start a request on our platform."
          },
           {
            type: 'calculator_link',
            link: '/tools/reinigungskosten',
            text: {
              de: "Berechnen Sie Ihre Reinigungskosten im Detail.",
              en: "Calculate your cleaning costs in detail."
            },
            buttonText: {
              de: "Zum Reinigungskostenrechner",
              en: "To the Cleaning Cost Calculator"
            }
          }
        ]
      },
       {
        question: {
          de: "Muss ich für die Reinigung zu Hause sein?",
          en: "Do I need to be at home for the cleaning?"
        },
        answer: [
          {
            de: "Nein, in der Regel nicht. Sie müssen der Reinigungsfirma lediglich den Zugang zur Wohnung ermöglichen, zum Beispiel durch eine Schlüsselübergabe. Es ist jedoch empfehlenswert, bei der Endabnahme durch die Verwaltung anwesend zu sein, zusammen mit einem Vertreter der Reinigungsfirma.",
            en: "No, usually not. You just need to provide the cleaning company with access to the apartment, for example, by handing over the keys. However, it is advisable to be present at the final inspection by the landlord, along with a representative of the cleaning company."
          }
        ]
      }
    ],
    paint: [
      {
        question: {
          de: "Was kosten Malerarbeiten in {city}?",
          en: "How much do painting services cost in {city}?"
        },
        answer: [
          {
            de: "Die Kosten für Malerarbeiten in {city} sind sehr variabel. Sie hängen von der zu streichenden Fläche, der Wandbeschaffenheit, der Farbqualität und dem Umfang der Vorarbeiten (z.B. Abdecken, Spachteln) ab. Eine 3.5-Zimmer-Wohnung (ca. 80m²) kann beispielsweise zwischen 1.800 und 3.500 CHF kosten. Holen Sie für eine genaue Kostenschätzung immer mehrere Offerten ein.",
            en: "The costs for painting services in {city} are highly variable. They depend on the area to be painted, the condition of the walls, the quality of the paint, and the extent of preparatory work (e.g., masking, filling). For example, a 3.5-room apartment (approx. 80m²) can cost between CHF 1,800 and CHF 3,500. For an accurate cost estimate, always obtain multiple quotes."
          }
        ]
      },
      {
        question: {
          de: "Muss ich beim Auszug meine Wohnung streichen?",
          en: "Do I have to paint my apartment when I move out?"
        },
        answer: [
          {
            de: "Das hängt von Ihrem Mietvertrag und der Abnutzung ab. In der Regel müssen nur übermässige Abnutzungen oder vom Mieter vorgenommene farbliche Änderungen beseitigt werden. Kleine Dübellöcher müssen fachmännisch verschlossen werden. Bei normaler Abnutzung nach vielen Jahren ist oft der Vermieter für einen Neuanstrich zuständig. Klären Sie dies im Zweifelsfall mit Ihrer Verwaltung.",
            en: "This depends on your rental agreement and the level of wear and tear. As a rule, only excessive wear or color changes made by the tenant need to be rectified. Small drill holes must be professionally filled. After many years of normal use, the landlord is often responsible for a new coat of paint. If in doubt, clarify this with your property management."
          }
        ]
      },
      {
        question: {
          de: "Was ist in einem Maler-Angebot normalerweise enthalten?",
          en: "What is typically included in a painter's quote?"
        },
        answer: [
          {
            de: "Ein professionelles Angebot sollte folgende Punkte detailliert auflisten: Kosten für Material (Farbe, Abdeckmaterial) und Arbeit, Vorbereitungsarbeiten (Abdecken, Reinigen, Spachteln), die Anzahl der Anstriche, das Streichen von Decken, Wänden, Türen und Rahmen sowie die Endreinigung und Entsorgung des Materials. Achten Sie auf eine transparente und vollständige Auflistung.",
            en: "A professional quote should list the following items in detail: costs for material (paint, masking material) and labor, preparatory work (masking, cleaning, filling), the number of coats, painting of ceilings, walls, doors, and frames, as well as final cleaning and disposal of materials. Look for a transparent and complete listing."
          }
        ]
      }
    ]
};