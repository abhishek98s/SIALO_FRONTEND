import { NextResponse } from "next/server";

export const handleErrorResponse = (error: any) => {
  if (error.response && error.response.data) {
    const errorMsg = error.response.data.msg;
    return NextResponse.json(
      { status: false, message: errorMsg },
      { status: error.response.status }
    );
  } else {
    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const handleApiError = (error: any) => {
  let errorMessage = "";
  if (error.response && error.response.data && error.response.data.message) {
    errorMessage = error.response.data.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unknown error occurred";
  }
  return errorMessage;
};
