import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("inventaris");

  const items = await db.collection("barang").find({}).toArray();
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("inventaris");
  const data = await req.json();

  const result = await db.collection("barang").insertOne(data);

  return new Response(
    JSON.stringify({ _id: result.insertedId, ...data }),
    { status: 201 }
  );
}

export async function PUT(req) {
  const client = await clientPromise;
  const db = client.db("inventaris");

  const updatedItem = await req.json();
  const { _id, ...rest } = updatedItem;

  const result = await db
    .collection("barang")
    .updateOne({ _id: new ObjectId(_id) }, { $set: rest });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req) {
  const client = await clientPromise;
  const db = client.db("inventaris");

  const { _id } = await req.json();
  const result = await db.collection("barang").deleteOne({ _id: new ObjectId(_id) });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
