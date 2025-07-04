import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";

interface AuthContextType {
    user: User | null;
    signInWithGoogle: () => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Initial session load
        const getUserSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session?.user) {
                setUser(session.user);
            }
        };

        getUserSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const signInWithGoogle = () => {
        supabase.auth.signInWithOAuth({ provider: "google" });
    };

    const signOut = () => {
        supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return context;
};
