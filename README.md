<h1 align="center">
  <img src="https://raw.githubusercontent.com/ITISEnricoFermi/archivio-digitale-client/81041b2932b032ead156777a6927efe1925b52ca/static/shortcut/safari-pinned-tab.svg?sanitize=true" height="100"><br/>
  📚 Archivio Digitale 📚
</h1>
<p align="center">
  Progetto Archivio Digitale sviluppato per l'ITIS Enrico Fermi.
</p>

## Getting Started

L'Archivio Digitale è suddiviso in due repository: [archivio-fermi-server](https://github.com/ITISEnricoFermi/archivio-digitale-server) e [archivio-fermi-client](https://github.com/ITISEnricoFermi/archivio-digitale-client).

### Prerequisiti

* Il web client necessita dell'installazione del [server](https://github.com/ITISEnricoFermi/archivio-digitale-server).

### Installazione

1. Clonare il repository nella destinazione desiderata

```shell
$ git clone https://github.com/ITISEnricoFermi/archivio-digitale-client/
```

2. Installare le dipendenze

```shell
$ cd archivio-digitale-client/
$ npm install
```

3. Creare il bundle

```shell
$ npm run build
```

4. Spostare il client nella cartella pubblica del server

```shell
$ cd ..
$ mv archivio-digitale-client/dist/* archivio-digitale-server/server/public/
```

**Per la configurazione del server consultare la pagina del repository: [archivio-digitale-server](https://github.com/ITISEnricoFermi/archivio-digitale-server).**

## Authors

* **Riccardo Sangiorgio** - [Richard1984](https://github.com/Richard1984/)
* **Ernesto Montada** - [n4y0n](https://github.com/n4y0n)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
