/* eslint-disable quotes */
import { NativeModules } from "react-native";

const { AppIconModule } = NativeModules;

/**
 * Fetches the app icon as a Base64-encoded string.
 * @param packageName The package name of the app (e.g., "com.instagram.android").
 * @returns A Promise resolving to the Base64-encoded image URI.
 */
export const getAppIcon = async (packageName: string): Promise<string | null> => {
    try {
        if (!AppIconModule || !AppIconModule.getAppIcon) {
            console.warn("AppIconModule is not linked correctly.");
            return null;
        }

        const base64Icon = await AppIconModule.getAppIcon(packageName);
        return `data:image/png;base64,${base64Icon}`;
    } catch (error) {
        console.error("Error fetching app icon:", error);
        return null;
    }
};
