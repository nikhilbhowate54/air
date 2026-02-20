import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================
// Normal LOGIN thunk
// ========================
export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", credentials);

    const { token, role, userId, permissions } = response.data;

    // Save to localStorage
    localStorage.setItem("permissions", JSON.stringify(permissions));
    localStorage.setItem("token", token);
    localStorage.setItem("id", userId);
    localStorage.setItem("role", role);

    return { token, role, permissions };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || "Login failed");
  }
});

// ========================
// Normal REGISTER thunk
// ========================
export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/register", data);

    const { token, role, userId, permissions } = response.data;

    // Save to localStorage
    localStorage.setItem("permissions", JSON.stringify(permissions));
    localStorage.setItem("token", token);
    localStorage.setItem("id", userId);
    localStorage.setItem("role", role);

    return { token, role, permissions };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || "Registration failed");
  }
});

// ========================
// Google LOGIN thunk
// ========================
export const googleLogin = createAsyncThunk("auth/googleLogin", async (token, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/google-login", { token });

    const { token: jwtToken, role, userId, permissions } = response.data;

    // Save to localStorage
    localStorage.setItem("permissions", JSON.stringify(permissions));
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("id", userId);
    localStorage.setItem("role", role);

    return { token: jwtToken, role, permissions };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || "Google login failed");
  }
});

// ========================
// Slice
// ========================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    permissions: JSON.parse(localStorage.getItem("permissions")) || [],
    isAuth: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("permissions");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      state.token = null;
      state.role = null;
      state.permissions = [];
      state.isAuth = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== LOGIN =====
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.permissions = action.payload.permissions || [];
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // ===== REGISTER =====
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.permissions = action.payload.permissions || [];
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // ===== GOOGLE LOGIN =====
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.permissions = action.payload.permissions || [];
        state.isAuth = true;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Google login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
