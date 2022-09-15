using DesafioPOO.Models;

// TODO: Realizar os testes com as classes Nokia e Iphone
Console.WriteLine("Teste Smartphone Nokia");
Nokia nokia = new Nokia(numero: "789456123", modelo:"NK320", imei:"789123", memoria:128);
nokia.ReceberLigacao();
nokia.InstalarAplicativo("Telegram");

Console.WriteLine("Teste Smartphone Iphone");
Iphone iphone = new Iphone(numero:"123456789", modelo:"XR", imei:"45678", memoria:64);
iphone.Ligar();
iphone.InstalarAplicativo("Whatsapp");