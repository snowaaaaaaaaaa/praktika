<?php
header('Content-Type: application/json');
try {
    $db = new PDO('sqlite:books.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $specialty = isset($_GET['specialty']) ? $_GET['specialty'] : null;

    if ($specialty) {
        $stmt = $db->prepare("SELECT * FROM books WHERE specialty = :specialty ORDER BY id DESC");
        $stmt->bindParam(':specialty', $specialty, PDO::PARAM_STR);
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
