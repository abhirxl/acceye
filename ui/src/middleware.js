import { NextResponse } from "next/server";

export default function middleware(req) {
  const cookieToken = req.cookies.get("token")?.value;
  const validUser = req.cookies.get("validUser")?.value;
  const permission = cookieToken && validUser ? true : false;
  const path = req.url;

  if (path.includes("/todotask/signup")) {
    if (permission == true) {
      return NextResponse.redirect("http://localhost:5001/todotask/task", path);
    } else {
      return NextResponse.next();
    }
  }

  if (path == "http://localhost:5001/") {
    if (permission == true) {
      return NextResponse.redirect("http://localhost:5001/todotask/task", path);
    } else {
      return NextResponse.redirect("http://localhost:5001/todotask", path);
    }
  }

  if (path.includes("/todotask/task")) {
    if (permission == true) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect("http://localhost:5001/todotask", path);
    }
  }

  if (path.includes("/recoverPassword")) {
    if (permission == true) {
      return NextResponse.redirect("http://localhost:5001/todotask", path);
    } else {
      return NextResponse.next();
    }
  }
}
