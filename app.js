import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import pool from "./config/db.js"
import { resolve } from 'url';
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.json({message:"Working"})
})
app.get("/tournaments",async (req,res)=>{
    try{
        const {data}= await pool.query(
            'select * from tournaments'
        )
        res.json(data)
    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
})
app.post("/tournaments",async (req,res)=>{
    try{
        const {tournament_name,start_date,end_date,status}=req.body
        const q=`
        insert into tournaments (tournament_name,start_date,end_date,status) 
        values($1,$2,$3,$4)
        returning *`
        const {data} =await pool.query(q,[tournament_name,start_date,end_date,status])
        res.status(201).json(data[0])

    }catch(err){
        if(err.code=="23505"){
            return res.status(404).json({error:"tournament name unique bulsin"})
        }
        res.status(500).json({error:err.message})
    }
})
app.get("/football_clubs",async (req,res)=>{

    try{
        const {data}=await pool.query('Select * from football_clubs')
        res.json(data)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
app.post("/football_clubs",async (req,res)=>{
    try{
        const {club_id,club_name,city,country,founded_year}=req.body
        const q=`insert into football_clubs(club_id,club_name,city,country,founded_year) 
        values($1,$2,$3,$4,$5) returning *`
        const {data} =await pool.query(q,[club_id,club_name,city,country,founded_year])
        res.status(201).json(data[0])
    }catch(er){
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Duplicate club_name' });
    }
    res.status(500).json({ error: err.message });
    }
})
app.get('/teams',async (req,res)=>{
    try{
        const q=`SELECT t.*, fc.*
      FROM teams t
      LEFT JOIN football_clubs fc
      ON t.club_id = fc.club_id`
      const {rows}=await pool.query(q)
      res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
app.post("/teams",async (req,res)=>{
    // try{
    //     const {team_id,team_name,}
    // }
})