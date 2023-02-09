# Markdown Links

![enter image description here](https://media.giphy.com/media/3o72F7RrTPW6jymXew/giphy.gif)  

## Índice

 
* [1.  Acerca de MdLinks](#1-AcercadeMdLinks)

* [2. Como instalar MdLinks](#2-ComoinstalarMdLinks)

* [3. Diagrama de flujo](#3-Diagramadeflujo)

* [4. Planning](#4-Planning)

***

## 1.Acerca de MdLinks

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Este proyecto tiene como finalidad ayudarte a encontrar estos links y brindar algunas estadísticas.

## 2. Como instalar MdLinks

### Instalación 

Instala esta librería con el comando: 

    npm i yessblack-md-links
    
O también puedes hacerlo desde Github:

    npm install yessblack/DEV001-md-links

Una vez instalado puedes usarlo con

    npm-link
    
### Uso

![image](https://user-images.githubusercontent.com/70681219/213899344-ea1da419-3182-428f-a621-8c59252efa84.png)

El comportamiento por defecto no valida si las URLs responden ok o no, solo identifican el archivo markdown, analiza el archivo Markdown e imprimir los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link.

    // Usage: 
      md-links <path-to-file> [options]
    
    // Commands:
      --v, --validate       Show validate links, makes an HTTP request to find out if the link works or not
      --s, --stats          Show basic statistics about links
      --v --s               Show statistics about links : total, unique, broken
      --validate --stats    Show statistics about links : total, unique, broken
      
    // Global options:
      -h, --help            display help for command
      

### Opciones

    --validate

Se realiza una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

    $ md-links ./some/example.md --validate
    ./some/example.md http://algo.com/2/3/ ok 200 Link a algo

![image](https://user-images.githubusercontent.com/70681219/213899373-214527a1-c1c0-4c96-bafc-a85392f99645.png)

`--stats`

Con  el comando `--stats` Información con estadísticas básicas sobre los links.

    $ md-links ./some/example.md --stats
    Total: 3
    Unique: 3

![image](https://user-images.githubusercontent.com/70681219/213899381-14ab610b-c0a3-4d92-845f-710063ab1e0d.png)

`--stats --validate`

También podemos combinar `--stats --validate` para obtener estadísticas que necesiten de los resultados de la validación.

    $ md-links ./some/example.md --stats --validate
    Total: 3
    Unique: 3
    Broken: 1

![image](https://user-images.githubusercontent.com/70681219/213899390-549a5a1d-eb54-44bd-a36a-1ccda0d04083.png)

### Y si introduces una ruta sin alguna opción 

Se muestra un arreglo con la información basica, `[{ href text path }]`

![image](https://user-images.githubusercontent.com/70681219/213899513-d7721e69-36b9-47eb-844f-7fc23710cd79.png)




