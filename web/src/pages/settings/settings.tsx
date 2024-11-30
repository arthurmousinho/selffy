import { PreferencesSettings } from "@/components/settings/preferencesSettings";
import { ProfileSettings } from "@/components/settings/profile-settings";

export function Settings() {
    return (
        <main className="space-y-4">
            <ProfileSettings />
            <PreferencesSettings />
        </main>
    )
}