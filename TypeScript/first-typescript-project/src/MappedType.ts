interface Users {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Partial<T> - Makes all properties optional
type PartialUser = Partial<Users>;
// Equivalent to: { id?: number; name?: string; email?: string; isAdmin?: boolean; }

// Required<T> - Makes all properties required
type RequiredUser = Required<Partial<Users>>;
// Equivalent to: { id: number; name: string; email: string; isAdmin: boolean; }

// Readonly<T> - Makes all properties readonly
type ReadonlyUser = Readonly<Users>;
// Equivalent to: { readonly id: number; readonly name: string; ... }

// Pick<T, K> - Creates a type with a subset of properties from T
type UserCredentials = Pick<Users, "email" | "id">;
// Equivalent to: { email: string; id: number; }

// Omit<T, K> - Creates a type by removing specified properties from T
type PublicUser = Omit<Users, "id" | "isAdmin">;
// Equivalent to: { name: string; email: string; }

// Record<K, T> - Creates a type with specified keys and value types
type UserRoles = Record<"admin" | "user" | "guest", string>;
// Equivalent to: { admin: string; user: string; guest: string; }
