import { PreferencesSettings } from "@/components/settings/preferencesSettings";
import { ProfileSettings } from "@/components/settings/profileSettings";

export function Settings() {
    return (
        <main className="space-y-4">
            <ProfileSettings />
            <PreferencesSettings />
        </main>
    )
}