import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CarList } from "../../constant/constant";

export interface Car {
    id: number;
    img: string;
    title: string;
    price: number;
    images: string[];
    description: string;
    specifications: {
        label: string;
        value: string;
    }[];
    features: {
        title: string;
        description: string;
    }[];
}

interface CarsState {
    cars: Car[];
    loading: boolean;
    error: string | null;
}

const initialState: CarsState = {
    cars: [],
    loading: false,
    error: null,
};

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
    return new Promise<Car[]>((resolve) => {
        setTimeout(() => {
            resolve(CarList);
        }, 500);
    });
});

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;
                state.cars = action.payload;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cars";
            });
    },
});

export default carsSlice.reducer;
