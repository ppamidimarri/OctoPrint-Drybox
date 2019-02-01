# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class DryboxPlugin(octoprint.plugin.StartupPlugin,
			octoprint.plugin.TemplatePlugin,
			octoprint.plugin.SettingsPlugin,
			octoprint.plugin.AssetPlugin):
	def on_after_startup(self):
		self._logger.info("Drybox says hello! URL: %s" % self._settings.get(["url"]))

	def get_settings_defaults(self):
		return dict(url="https://pamidimarri.com/drybox/humidity.html")

	def get_template_configs(self):
		return [
			dict(type="navbar", custom_bindings=False),
			dict(type="settings", custom_bindings=False)
		]

	def get_assets(self):
		return dict(
			js=["js/drybox.js"],
			css=["css/drybox.css"]
		)

__plugin_name__ = "Drybox"
__plugin_implementation__ = DryboxPlugin()