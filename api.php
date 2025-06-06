<?php
header('Content-Type: application/json');

$host = 'books.mysql.database.azure.com';
$dbname = 'books';
$username = 'dvorovenko';
$password = 'Davayzhe1';

$ssl_ca = 'C:\\xampp\\htdocs\\kursova\\BaltimoreCyberTrustRoot.crt.pem';

try {
    $db = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $username,
        $password,
        [
            PDO::MYSQL_ATTR_SSL_CA => $ssl_ca,
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
        ]
    );
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $specialty = isset($_GET['specialty']) ? $_GET['specialty'] : null;

    if ($specialty) {
        $stmt = $db->prepare("SELECT * FROM books WHERE specialty = :specialty ORDER BY id DESC");
        $stmt->bindParam(':specialty', $specialty, PDO::PARAM_INT);
    } else {
        $stmt = $db->query("SELECT * FROM books ORDER BY id DESC");
    }

    $stmt->execute();
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($books);

} catch (PDOException $e) {
    echo json_encode(["error" => "Помилка підключення до бази: " . $e->getMessage()]);
}
?>
