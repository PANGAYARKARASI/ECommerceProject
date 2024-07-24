using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Model
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        [Required]
        [StringLength(20)]
        public string? Name { get; set; }
        [Required]
        [StringLength(30)]
        public string? Role { get; set; }
        [Required]
        [RegularExpression(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$",
            ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$",
            ErrorMessage = "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.")]
        public string? Password { get; set; }
    }
}