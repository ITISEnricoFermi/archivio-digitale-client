<template>
  <aside class="menu-left">
  	<header class="menu-left__header">
  		<img src="/static/logo/itisFermi_white.svg" class="menu-left__logo" alt="ITIS Enrico Fermi">
  	</header>
  	<ul class="menu-left__main">
  		<li class="menu-left__li menu-left__li--active" data-tab="panel__dashboard" @click="changePanel('appPanelDashboard')">
  			<span><i class="fas fa-tachometer-alt"></i></span>
  			<span>Dashboard</span>
  			<span class="menu-left__li-tag u-bg-color-red">Disattivo</span>
  		</li>
  		<li class="menu-left__li" data-tab="panel__search" @click.stop="changePanel('appPanelSearch')">
  			<span><i class="fa fa-search" aria-hidden="true"></i></span>
  			<span>Ricerca</span>
  			<span class="menu-left__li-tag u-bg-color-red">Disattivo</span>
  		</li>
  		<li class="menu-left__li" data-tab="panel__upload" @click.stop="changePanel('appPanelUpload')">
  			<span><i class="fas fa-pencil-alt"></i></span>
  			<span>Inserisci</span>
  			<span class="menu-left__li-tag u-bg-color-red">Disattivo</span>
  		</li>
  		<li class="menu-left__li" data-tab="panel__admin" @click.stop="changePanel('appPanelAdmin')">
  			<span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
  			<span>Admin</span>
  			<span class="menu-left__li-tag u-bg-color-yellow">Beta</span>
  		</li>
  		<li class="menu-left__li" data-tab="panel__profile" @click.stop="changePanel('appPanelProfile')">
  			<span><i class="fa fa-user" aria-hidden="true"></i></span>
  			<span>Profilo</span>
  			<span class="menu-left__li-tag u-bg-color-red">Disattivo</span>
  		</li>
  		<li class="menu-left__li" data-tab="panel__settings" @click.stop="changePanel('appPanelSettings')">
  			<span><i class="fa fa-cog" aria-hidden="true"></i></span>
  			<span>Impostazioni</span>
  			<span class="menu-left__li-tag u-bg-color-green">Attivo</span>
  		</li>
  		<li class="menu-left__li" data-tab="panel--logout" @click="logout">
  			<span><i class="fas fa-sign-out-alt"></i></span>
  			<span>Logout</span>
  			<span class="menu-left__li-tag u-bg-color-green">Attivo</span>
  		</li>
  	</ul>
  	<footer class="menu-left__footer">
  		Powered By
  		<a href="https://www.riccardosangiorgio.com" class="menu-left__footer--a" target="_blank">Riccardo Sangiorgio</a>
  	</footer>
  </aside>

</template>

<script>
  export default {
    data: () => {
      return {

      };
    },
    methods: {
      changePanel(panel) {

        document.getElementsByClassName("menu-left__li--active")[0].classList.remove("menu-left__li--active");

        if(event.srcElement.tagName == "LI") {
          event.target.classList.add("menu-left__li--active");
        } else {
          event.srcElement.parentNode.classList.add("menu-left__li--active");
        }

        this.$emit("panelChanged", panel);
      },
      logout() {
        window.location.replace("/logout");
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
