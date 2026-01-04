import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'truthbetold_user_id';

/**
 * Generate a UUID v4
 * Simple implementation for anonymous user tracking
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get or create anonymous user ID
 * Stored in AsyncStorage for persistence across app sessions
 * This enables privacy-friendly analytics without authentication
 */
export async function getUserId(): Promise<string> {
  try {
    // Try to get existing user ID
    let userId = await AsyncStorage.getItem(USER_ID_KEY);
    
    // If no user ID exists, generate and save one
    if (!userId) {
      userId = generateUUID();
      await AsyncStorage.setItem(USER_ID_KEY, userId);
      console.log('Generated new user ID:', userId);
    } else {
      console.log('Retrieved existing user ID:', userId);
    }
    
    return userId;
  } catch (error) {
    console.error('Error managing user ID:', error);
    // Fallback to generating a new UUID if storage fails
    return generateUUID();
  }
}

/**
 * Clear the user ID (useful for testing or privacy reset)
 */
export async function clearUserId(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_ID_KEY);
    console.log('User ID cleared');
  } catch (error) {
    console.error('Error clearing user ID:', error);
  }
}

