using System;
using rpg_csharp.src.Entities;

namespace rpg_csharp
{
    class Program
    {
        static void Main(string[] args)
        {
            Knight hero = new Knight("Arus", 42,"Knight");
            Ninja ninja = new Ninja("Wedge", 42, "Ninja");
            Wizard wizard = new Wizard ("Jenica", 42,"White Wizard");
            // hero.Name = "Arus";
            // hero.Level = 42;
            // hero.HeroType = "Knight";

            Console.WriteLine(hero.Attack());
            Console.WriteLine(ninja.Attack());
            Console.WriteLine(wizard.Attack(5));
            Console.WriteLine(wizard.Attack(8));
        }
    }
}
