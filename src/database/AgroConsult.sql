CREATE DATABASE AGROCONSULT;
USE AGROCONSULT;

Create table Empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	NomeEmpresa VARCHAR(40),
	CNPJ CHAR(20) UNIQUE NOT NULL
);

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	NomeUsuario varchar(100) NOT NULL,
	Email varchar(100) UNIQUE NOT NULL,
	Cargo varchar(20) NOT NULL,
	Senha Varchar(255) NOT NULL,
	FkEmpresa INT NOT NULL, 
	FOREIGN KEY (FkEmpresa) references Empresa(idEmpresa));