<template>
<div class="menu-header-container">
  <ul class="menu-header-container__main">
		<li class="menu-header-container__li menu-header-container__li--active" data-tab="panel__dashboard" @click.stop="changePanel('appPanelDashboard')">
			<span><i class="fas fa-tachometer-alt"></i></span>
			<span>Dashboard</span>
			<span class="menu-header-container__li-tag u-bg-color-yellow">BETA</span>
		</li>
		<li class="menu-header-container__li" data-tab="panel__search" @click.stop="changePanel('appPanelSearch')">
			<span><i class="fa fa-search" aria-hidden="true"></i></span>
			<span>Ricerca</span>
			<span class="menu-header-container__li-tag u-bg-color-green">Attivo</span>
		</li>
		<li class="menu-header-container__li" data-tab="panel__upload" @click.stop="changePanel('appPanelUpload')">
			<span><i class="fas fa-pencil-alt"></i></span>
			<span>Inserisci</span>
			<span class="menu-header-container__li-tag u-bg-color-green">Attivo</span>
		</li>
		<li class="menu-header-container__li" data-tab="panel__admin" @click.stop="changePanel('appPanelAdmin')" v-if="privileges == 'admin'">
			<span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
			<span>Admin</span>
			<span class="menu-header-container__li-tag u-bg-color-yellow">Beta</span>
		</li>
		<li class="menu-header-container__li" data-tab="panel__profile" @click.stop="changePanel('appPanelProfile')">
			<span><i class="fa fa-user" aria-hidden="true"></i></span>
			<span>Profilo</span>
			<span class="menu-header-container__li-tag u-bg-color-blue">Alpha</span>
		</li>
		<li class="menu-header-container__li" data-tab="panel__settings" @click.stop="changePanel('appPanelSettings')">
			<span><i class="fa fa-cog" aria-hidden="true"></i></span>
			<span>Impostazioni</span>
			<span class="menu-header-container__li-tag u-bg-color-green">Attivo</span>
		</li>
		<li class="menu-header-container__li" data-tab="panel--logout" @click.stop="logout">
			<span><i class="fas fa-sign-out-alt"></i></span>
			<span>Logout</span>
			<span class="menu-header-container__li-tag u-bg-color-green">Attivo</span>
		</li>
	</ul>
</div>
</template>

<script>
  export default {
    name: "menuMobile",
    props: ["privileges"],
    methods: {
      changePanel(panel) {

        document.getElementsByClassName("menu-header-container__li--active")[0].classList.remove("menu-header-container__li--active");

        if(event.srcElement.tagName == "LI") {
          event.target.classList.add("menu-header-container__li--active");
        } else {
          event.srcElement.parentNode.classList.add("menu-header-container__li--active");
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
