# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin
import octoprint.settings

class DryboxPlugin(octoprint.plugin.StartupPlugin,
			octoprint.plugin.TemplatePlugin,
			octoprint.plugin.SettingsPlugin,
			octoprint.plugin.AssetPlugin):
	def on_after_startup(self):
		self._logger.info("Drybox loaded, with URL: %s" % self._settings.get(["url"]))

	def get_settings_defaults(self):
		return dict(url='http://192.168.86.181/index.html')

	def get_template_configs(self):
		return [dict(type="settings", custom_bindings=False)]

	def get_assets(self):
		return dict(
			js=["js/drybox.js"],
			css=["css/drybox.css"]
		)

__plugin_name__ = "Drybox"
__plugin_implementation__ = DryboxPlugin()
