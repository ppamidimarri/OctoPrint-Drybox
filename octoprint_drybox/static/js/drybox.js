/*
 * View model for OctoPrint-Drybox
 *
 * Author: Pavan Pamidimarri
 * License: AGPLv3
 */
$(function() {
    function DryboxViewModel(parameters) {
        var self = this;

        var linkFrame = $('#link_frame');

        self.settings = parameters[0];

        self.drybox_profiles = ko.observable();
        self.enabed_buttons = ko.observable();

        // This will get called before the DryboxViewModel gets bound to the DOM, but after its
        // dependencies have already been initialized. It is especially guaranteed that this method
        // gets called _after_ the settings have been retrieved from the OctoPrint backend and thus
        // the SettingsViewModel been properly populated.
        self.onBeforeBinding = function() {
            self.drybox_profiles(self.settings.settings.plugins.drybox.drybox_profiles());
            self.loadLink(self.drybox_profiles()[0]);
        };

        self.onEventSettingsUpdated = function(payload) {
            self.drybox_profiles(self.settings.settings.plugins.drybox.drybox_profiles());
        };

        self.addDryboxProfile = function() {
            self.settings.settings.plugins.drybox.drybox_profiles.push({name: ko.observable('Link '+self.drybox_profiles().length), url: ko.observable('http://'), isButtonEnabled: ko.observable(true)});
            self.drybox_profiles(self.settings.settings.profiles.drybox.drybox_profiles());
        };

        self.removeDryboxProfile = function(profile) {
            self.settings.settings.plugins.drybox.drybox_profiles.remove(profile);
            self.drybox_profiles(self.settings.plugins.drybox.drybox_profiles());
        };

        self.loadLink = function(profile, event) {
            linkFrame.attr('src', ko.toJS(profile).url);
            ko.utils.arrayForEach(self.drybox_profiles(), function (item) {
                if(profile==item) {
                    item.isButtonEnabled(false);
                } else {
                    item.isButtonEnabled(true);
                }
            });
        };

        self.onAfterTabChange = function(current, previous) {
            ko.utils.arrayForEach(self.drybox_profiles(), function (item, index) {
                if(index==0) {
                    item.isButtonEnabled(false);
                } else {
                    item.isButtonEnabled(true);
                }
            });
        };
     }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: DryboxViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: [ "settingsViewModel" ],
        // Elements to bind to, e.g. #settings_plugin_drybox, #tab_plugin_drybox, ...
        elements: [ "#settings_plugin_drybox_form", "#tab_plugin_drybox" ]
    });
});
