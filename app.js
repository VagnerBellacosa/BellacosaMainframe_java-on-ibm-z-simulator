if (

    "serviceWorker"

    in navigator

) {

    window.addEventListener(

        "load",

        async ()=>{

            try{

                await navigator

                .serviceWorker

                .register(

                    "./service-worker.js"

                );

                console.log(

                    "✔ Service Worker registrado."

                );

            }

            catch(e){

                console.error(e);

            }

        }

    );

}

