/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 seo/schema.js
 Geração de JSON-LD (Schema.org)
=========================================================*/

const BASE_URL = window.location.origin;

const DEFAULT_IMAGE =
`${BASE_URL}/images/java.png`;

const AUTHOR = {

    "@type":"Person",

    name:"Vagner Bellacosa",

    url:"https://www.linkedin.com/in/vagnerbellacosa"

};

const PUBLISHER = {

    "@type":"Organization",

    name:"Bellacosa Mainframe",

    logo:{

        "@type":"ImageObject",

        url:`${BASE_URL}/images/java.png`

    }

};

class SchemaManager{

    constructor(){

        this.schemas=[];

    }

    /*=====================================================
      PUBLICAR
    =====================================================*/

    publish(){

        this.clear();

        this.schemas.forEach(schema=>{

            const script=document.createElement("script");

            script.type="application/ld+json";

            script.textContent=

                JSON.stringify(schema,null,2);

            document.head.appendChild(script);

        });

    }

    /*=====================================================
      LIMPAR
    =====================================================*/

    clear(){

        document

        .querySelectorAll(

            'script[type="application/ld+json"]'

        )

        .forEach(

            node=>node.remove()

        );

    }

    /*=====================================================
      ADICIONAR
    =====================================================*/

    add(schema){

        this.schemas.push(schema);

    }

    /*=====================================================
      WEBSITE
    =====================================================*/

    website(){

        this.add({

            "@context":"https://schema.org",

            "@type":"WebSite",

            name:"Bellacosa Mainframe",

            url:BASE_URL,

            description:

            "Laboratório Java para IBM Mainframe.",

            inLanguage:"pt-BR"

        });

    }

    /*=====================================================
      WEBPAGE
    =====================================================*/

    webpage({

        title,

        description,

        path="/"

    }){

        this.add({

            "@context":"https://schema.org",

            "@type":"WebPage",

            name:title,

            description,

            url:BASE_URL+path,

            inLanguage:"pt-BR"

        });

    }

    /*=====================================================
      ARTICLE
    =====================================================*/

    article({

        title,

        description,

        image=DEFAULT_IMAGE,

        path="/"

    }){

        this.add({

            "@context":"https://schema.org",

            "@type":"Article",

            headline:title,

            description,

            image,

            author:AUTHOR,

            publisher:PUBLISHER,

            datePublished:

                new Date().toISOString(),

            dateModified:

                new Date().toISOString(),

            mainEntityOfPage:

                BASE_URL+path

        });

    }

    /*=====================================================
      COURSE
    =====================================================*/

    course(){

        this.add({

            "@context":"https://schema.org",

            "@type":"Course",

            name:

            "Java para IBM Mainframe",

            description:

            "Laboratório interativo para desenvolvedores COBOL.",

            provider:{

                "@type":"Organization",

                name:"Bellacosa Mainframe"

            },

            educationalLevel:

            "Beginner"

        });

    }

    /*=====================================================
      QUIZ
    =====================================================*/

    quiz(){

        this.add({

            "@context":"https://schema.org",

            "@type":"Quiz",

            name:

            "Quiz Java no IBM Z",

            educationalAlignment:{

                "@type":"AlignmentObject",

                educationalFramework:

                "IBM Z"

            }

        });

    }

    /*=====================================================
      SOFTWARE
    =====================================================*/

    software(){

        this.add({

            "@context":"https://schema.org",

            "@type":"SoftwareApplication",

            name:

            "Java IBM Z Simulator",

            applicationCategory:

            "EducationalApplication",

            operatingSystem:

            "Browser",

            offers:{

                "@type":"Offer",

                price:"0",

                priceCurrency:"BRL"

            }

        });

    }

    /*=====================================================
      BREADCRUMB
    =====================================================*/

    breadcrumb(){

        this.add({

            "@context":"https://schema.org",

            "@type":"BreadcrumbList",

            itemListElement:[

                {

                    "@type":"ListItem",

                    position:1,

                    name:"Home",

                    item:BASE_URL

                },

                {

                    "@type":"ListItem",

                    position:2,

                    name:"Java IBM Z"

                }

            ]

        });

    }

    /*=====================================================
      FAQ
    =====================================================*/

    faq(){

        this.add({

            "@context":"https://schema.org",

            "@type":"FAQPage",

            mainEntity:[

                {

                    "@type":"Question",

                    name:

                    "Java roda no IBM Z?",

                    acceptedAnswer:{

                        "@type":"Answer",

                        text:

                        "Sim. O IBM Z possui JVM otimizada."

                    }

                },

                {

                    "@type":"Question",

                    name:

                    "COBOL e Java podem trabalhar juntos?",

                    acceptedAnswer:{

                        "@type":"Answer",

                        text:

                        "Sim. Ambos podem compartilhar aplicações, CICS, Db2 e APIs."

                    }

                }

            ]

        });

    }

    /*=====================================================
      HOWTO
    =====================================================*/

    howTo(){

        this.add({

            "@context":"https://schema.org",

            "@type":"HowTo",

            name:

            "Primeiros passos em Java no IBM Z",

            step:[

                {

                    "@type":"HowToStep",

                    text:"Aprenda os conceitos."

                },

                {

                    "@type":"HowToStep",

                    text:"Resolva o quiz."

                },

                {

                    "@type":"HowToStep",

                    text:"Derrote o Boss."

                }

            ]

        });

    }

    /*=====================================================
      GAME
    =====================================================*/

    game(){

        this.add({

            "@context":"https://schema.org",

            "@type":"Game",

            name:

            "Java no IBM Z Simulator",

            applicationCategory:

            "Educational Game",

            genre:

            "Education"

        });

    }

}

const schema=new SchemaManager();

export default schema;